// Shared role-to-paths mapping used in both middleware and sidebar
export const ROLE_PATHS: Record<string, string[]> = {
  admin: ["/dashboard/registration", "/dashboard/visitor-list", "/dashboard/security-list", "/dashboard/report", "/dashboard/finance-dashboard", "/dashboard/transaction-record", "/dashboard/add-transaction", "/dashboard/commitment", "/dashboard/wishlist"],
  guard: ["/dashboard/registration", "/dashboard/visitor-list"],
  manager: ["/dashboard/security-list", "/dashboard/report"],
  finance: ["/dashboard/finance-dashboard", "/dashboard/transaction-record", "/dashboard/add-transaction", "/dashboard/commitment", "/dashboard/wishlist"],
};
