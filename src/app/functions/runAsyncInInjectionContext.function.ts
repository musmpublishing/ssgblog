import { Injector } from "@angular/core";
import { runInInjectionContext } from "@angular/core"; // Importa la funzione corretta

export async function runAsyncInInjectionContext<T>(
  injector: Injector,
  fn: () => Promise<T>
): Promise<T> {
  return await runInInjectionContext(injector, () => {
    return new Promise((resolve, reject) => {
      fn().then(resolve).catch(reject);
    });
  });
}
