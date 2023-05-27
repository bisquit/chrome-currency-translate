import { CurrencyCode } from '../../core/currencies';

export type Config = {
  toCurrencyCode: CurrencyCode;
};

export async function setConfig(config: Partial<Config>) {
  await chrome.storage.sync.set({
    config,
  });
}

export async function getConfig(): Promise<Partial<Config> | undefined> {
  const config = (await chrome.storage.sync.get('config')).config;

  // sanitize configs.
  // const obsoleteKeys = Object.keys(userConfig).filter(
  //   (v) => !configKeys.includes(v)
  // );
  // await chrome.storage.sync.remove(obsoleteKeys);

  return config;
}

export async function getConfigWithDefault(): Promise<Config> {
  const config = await getConfig();

  return {
    toCurrencyCode: config?.toCurrencyCode ?? getDefaultToCurrencyCode(),
  };
}

export async function clearConfig() {
  await chrome.storage.sync.remove('config');
}

function getDefaultToCurrencyCode(): CurrencyCode {
  return 'USD';
}
