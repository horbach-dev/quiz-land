import { useMemo } from "react";
import { retrieveLaunchParams, type RetrieveLPResult } from "@telegram-apps/sdk-react";

export const useTelegramUser = () => {
  const launchParams = useMemo<RetrieveLPResult>(() => retrieveLaunchParams(), []);

  return {
    firstName: launchParams?.tgWebAppData?.user?.first_name || '',
    username: launchParams?.tgWebAppData?.user?.username || '',
    avatar: launchParams?.tgWebAppData?.user?.photo_url || '',
  }
}
