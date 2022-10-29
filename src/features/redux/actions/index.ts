import { createAction } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'
import type { Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'

const increment = createAction<number>('INCREMENT')

export const epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(increment.match),
    map((action: any) => {
      // action.payload can be safely used as number here (and will also be correctly inferred by TypeScript)
      // ...
      console.log(action)
    })
  )
