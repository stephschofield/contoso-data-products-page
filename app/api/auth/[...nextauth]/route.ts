import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    AzureADProvider({
      clientId: "YOUR_AZURE_AD_CLIENT_ID", // Replace with your Azure AD Client ID
      clientSecret: "YOUR_AZURE_AD_CLIENT_SECRET", // Replace with your Azure AD Client Secret
      tenantId: "YOUR_AZURE_AD_TENANT_ID", // Replace with your Azure AD Tenant ID
      // Simplify the authorization configuration
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  // A random string used to hash tokens, sign cookies and generate cryptographic keys.
  secret: "YOUR_NEXTAUTH_SECRET", // Replace with a secure random string
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  // Simple JWT configuration
  session: {
    strategy: "jwt",
  },
  // Add debug mode to get detailed error messages in development
  debug: false,
  // Add custom error handling
  logger: {
    error(code, metadata) {
      console.error(`NextAuth Error [${code}]:`, metadata)
    },
  },
})

export { handler as GET, handler as POST }
