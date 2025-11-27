import * as React from 'react';

declare module 'react' {
  interface CSSProperties {
    '--padding-top'?: string | number;
    '--padding-bottom'?: string | number;
  }
}
