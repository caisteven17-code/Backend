import { redirect } from "next/navigation";
import { Settings } from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { UserMenu } from "@/app/dashboard/user-menu";

type BeneficiaryAmountRow = {
  total_amount_received: number | string | null;
};

function parseAmount(value: BeneficiaryAmountRow["total_amount_received"]) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Number(value.replace(/,/g, ""));

    if (Number.isFinite(parsedValue)) {
      return parsedValue;
    }
  }

  return 0;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    user.user_metadata.full_name ??
    user.user_metadata.name ??
    user.email ??
    "Beneficiary";

  const { data: beneficiaryRows } = await supabase
    .from("beneficiaries")
    .select("total_amount_received")
    .eq("auth_user_id", user.id);

  const totalAmountReceived = (beneficiaryRows ?? []).reduce((total, row) => {
    return total + parseAmount((row as BeneficiaryAmountRow).total_amount_received);
  }, 0);

  const formattedTotalAmountReceived = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(totalAmountReceived);

  async function logout() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between bg-[#e09f9f] px-6 py-4 text-white shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Small Logo Icon */}
          <div className="h-8 w-8 opacity-80">
            <img
              src="/images/logo_h.png"
              alt="Mini Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="text-xl font-bold tracking-wide">Beneficiary Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <UserMenu displayName={displayName} logoutAction={logout} />
          <button className="transition duration-300 hover:rotate-90">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative flex flex-1 flex-col items-center justify-center p-6">
        {/* Blurred Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            filter: "blur(8px)",
            transform: "scale(1.05)",
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gray-900/60"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
          <h2 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            Welcome back, {displayName}!
          </h2>
          <p className="mb-10 text-lg text-gray-200">
            Here&apos;s your disaster relief assistance summary
          </p>

          {/* Amount Card */}
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-10 shadow-xl">
            <h3 className="mb-6 font-semibold text-gray-600">Total Amount Received</h3>

            <div className="mb-6 text-5xl font-bold tracking-tight text-[#1f2937] md:text-6xl">
              {formattedTotalAmountReceived}
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Total donations received for disaster relief assistance
            </p>
          </div>
        </div>
      </main>

      {/* 2. THE FIXED HELP BUTTON HAS BEEN REMOVED FROM HERE */}
    </div>
  );
}
