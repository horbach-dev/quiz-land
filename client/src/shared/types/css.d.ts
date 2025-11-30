import * as React from 'react';

declare module 'react' {
  interface CSSProperties {
    '--padding-top'?: string | number;
    '--padding-bottom'?: string | number;
    '--safe-area-top'?: string | number;
    '--safe-area-bottom'?: string | number;
  }
}
