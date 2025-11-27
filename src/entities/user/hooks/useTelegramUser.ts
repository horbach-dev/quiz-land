import { useMemo } from "react";
import { retrieveLaunchParams, type RetrieveLPResult } from "@telegram-apps/sdk-react";
import type { ITelegramUser } from "../types";

export const useTelegramUser = (): ITelegramUser => {
  const launchParams = useMemo<RetrieveLPResult>(() => retrieveLaunchParams(), []);

  return {
    id: launchParams?.tgWebAppData?.user?.id || '',
    language: 'ru-RU',
    first_name: launchParams?.tgWebAppData?.user?.first_name || '',
    last_name: launchParams?.tgWebAppData?.user?.last_name || '',
    username: launchParams?.tgWebAppData?.user?.username || '',
    avatar: launchParams?.tgWebAppData?.user?.photo_url || '',
  }
}
