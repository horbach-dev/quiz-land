import { createPortal } from 'react-dom';

import { Popup } from '@/shared/components/Popup';
import { registerPopups } from '@/shared/popups/registerPopups';
import { usePopupStore } from '@/shared/stores/popupStore';

const PORTAL_ROOT = document.getElementById('modals')!;

export const Popups = () => {
  const popups = usePopupStore((state) => state.popups);

  return createPortal(
    popups
      .toSorted((a, b) => a.lastOpen - b.lastOpen)
      .map(({ name, isOpen, close, params }) => {
        const Component = registerPopups[name];
        if (!Component) return null;

        return (
          <Popup
            key={name}
            isOpen={isOpen}
            onClose={() => (params?.overlayClose ? close() : null)}
          >
            <Component
              close={close}
              {...(params as any)}
            />
          </Popup>
        );
      }),
    PORTAL_ROOT,
  );
};
