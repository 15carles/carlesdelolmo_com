"use client";

import { useEffect, useState } from 'react';
import { makePage } from '@keystatic/next/ui/app';
import config from '../../keystatic.config';

const KeystaticApp = makePage(config);
const STORAGE_RECOVERY_KEY = 'keystatic-storage-recovery-v1';

function clearKeystaticIndexedDb(): Promise<void> {
  return new Promise(resolve => {
    if (typeof indexedDB === 'undefined') {
      resolve();
      return;
    }
    const request = indexedDB.deleteDatabase('keystatic');
    const done = () => resolve();
    request.onsuccess = done;
    request.onerror = done;
    request.onblocked = done;
  });
}

async function runKeystaticStorageRecoveryOnce() {
  if (typeof window === 'undefined') return;

  if (sessionStorage.getItem(STORAGE_RECOVERY_KEY) === 'done') return;

  const url = new URL(window.location.href);
  const forceRecovery = url.searchParams.get('ksRecover') === '1';
  const alreadyRecovered = localStorage.getItem(STORAGE_RECOVERY_KEY) === 'done';

  if (!forceRecovery && alreadyRecovered) {
    sessionStorage.setItem(STORAGE_RECOVERY_KEY, 'done');
    return;
  }

  await clearKeystaticIndexedDb();
  localStorage.setItem(STORAGE_RECOVERY_KEY, 'done');
  sessionStorage.setItem(STORAGE_RECOVERY_KEY, 'done');
}

export default function KeystaticPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    runKeystaticStorageRecoveryOnce().finally(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return <div style={{ padding: 24 }}>Inicializando editor...</div>;
  }

  return <KeystaticApp />;
}
