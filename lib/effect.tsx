import { useEffect, useRef } from "react";

type EffectFunction = () => void | (() => void | undefined);

// Define the custom hook with TypeScript annotations
export function useNoInitialEffect(effect: EffectFunction, dependencies: any[]): void {
 const initialRender = useRef(true);

 useEffect(() => {
    let effectReturns;

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns;
    }
    return undefined;
 }, dependencies);
}
