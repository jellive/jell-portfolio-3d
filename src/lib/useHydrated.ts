"use client";

import { useSyncExternalStore } from "react";

/** 값이 절대 안 변하므로 구독은 아무것도 하지 않는다. 참조가 고정이라 재구독도 안 일어난다. */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * 서버 렌더와 하이드레이션 첫 렌더에서 false, 그 뒤 true.
 *
 * 왜 useState + useEffect 가 아닌가: 그 형태는 effect 안에서 setState 를 하게 되고
 * (react-hooks/set-state-in-effect), 룰이 가리키는 마운트 직후 캐스케이딩 렌더가 실제로 생긴다.
 * useSyncExternalStore 는 원시값 스냅숏을 서버/클라이언트로 나눠 주므로 그 경로 자체가 없다.
 *
 * 쓰는 쪽 계약: 이 값이 false 인 동안에는 브라우저 전용 값을 **화면에 반영하지 않는다.**
 * 그래야 서버가 그린 것과 하이드레이션 첫 렌더가 같아 미스매치가 안 난다.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
