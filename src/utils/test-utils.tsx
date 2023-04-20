import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducers, RootState } from '../redux/store'
import type { PreloadedState } from '@reduxjs/toolkit'

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
   return configureStore({ reducer: reducers, preloadedState })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
   preloadedState?: PreloadedState<RootState>
   store?: AppStore
}

function renderWithProviders(
   ui: React.ReactElement,
   {
      preloadedState = {},
      store = configureStore({ reducer: reducers, preloadedState }),
      ...renderOptions
   }: ExtendedRenderOptions = {}
) {
   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
      return <Provider store={store}>{children}</Provider>
   }
   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
// override render method
export { renderWithProviders }
