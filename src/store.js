import { BehaviorSubject } from 'rxjs';

export const stats$ = new BehaviorSubject(JSON.parse(localStorage.getItem('stats' || '{}')));

export function updateStats(newStats) {
  localStorage.setItem('stats', JSON.stringify(newStats));
  stats$.next(newStats);
};
