import { Share } from "lucide-react";
import { shareURL } from "@tma.js/sdk-react";
import { Button } from "@/shared/ui/Button";
import { APP_URL } from "@/constants";

const text = `Приложение для прохождения и создания квизов!`

export const ShareAppButton = () => {
  const handleShare = () => {
    shareURL(APP_URL, text);
  }

  return (
    <Button
      onClick={handleShare}
      after={<Share />}
    >
      Поделиться
    </Button>
  )
}
