# Microsoft Entra ID Authentication Setup

This document provides instructions for setting up Microsoft Entra ID (formerly Azure AD) authentication for the Cloud Fabric Deployment platform.

## Prerequisites

- Microsoft Azure account with admin access to create app registrations
- Access to the Azure portal (portal.azure.com)

## Step 1: Create an App Registration in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com)
2. Navigate to **Microsoft Entra ID** > **App registrations**
3. Click **New registration**
4. Enter the following information:
   - **Name**: Discover University Data
   - **Supported account types**: Accounts in this organizational directory only (Single tenant)
   - **Redirect URI**: Web > http://localhost:3000/api/auth/callback/azure-ad
5. Click **Register**

## Step 2: Configure Authentication

1. In your newly created app registration, navigate to **Authentication**
2. Under **Implicit grant and hybrid flows**, check **ID tokens**
3. Under **Advanced settings**, set **Allow public client flows** to **No**
4. Click **Save**

## Step 3: Create a Client Secret

1. Navigate to **Certificates & secrets**
2. Under **Client secrets**, click **New client secret**
3. Enter a description and select an expiration period
4. Click **Add**
5. **IMPORTANT**: Copy the secret value immediately and store it securely. You won't be able to see it again.

## Step 4: Configure API Permissions

1. Navigate to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Add the following permissions:
   - User.Read
   - email
   - offline_access
   - openid
   - profile
6. Click **Add permissions**
7. Click **Grant admin consent for [Your Organization]**

## Step 5: Configure Environment Variables

1. Copy the `.env.local.example` file to `.env.local`
2. Update the following values:
   - `AZURE_AD_CLIENT_ID`: The Application (client) ID from the Overview page
   - `AZURE_AD_CLIENT_SECRET`: The client secret value you created
   - `AZURE_AD_TENANT_ID`: The Directory (tenant) ID from the Overview page
   - `NEXTAUTH_URL`: The URL of your application (use http://localhost:3000 for local development)
   - `NEXTAUTH_SECRET`: A random string used to hash tokens (generate one using `openssl rand -base64 32`)

## Step 6: Configure Production Redirect URIs

Before deploying to production:

1. Navigate back to your app registration in the Azure portal
2. Go to **Authentication**
3. Add your production redirect URI: https://yourdomain.com/api/auth/callback/azure-ad
4. Click **Save**

## Troubleshooting

- **Error: AADSTS50011**: Ensure your redirect URI is correctly configured in both your app registration and your application code.
- **Error: AADSTS7000218**: Ensure your client secret is correct and has not expired.
- **Error: AADSTS65001**: Ensure the user has consent to use the application.

For more information, refer to the [Microsoft Entra ID documentation](https://learn.microsoft.com/en-us/entra/identity-platform/).
