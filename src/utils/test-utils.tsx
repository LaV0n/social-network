import React, { PropsWithChildren } from 'react'
import { render, render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { AppStore, reducers, RootState, setupStore } from '../redux/store'
import type { PreloadedState } from '@reduxjs/toolkit'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
   preloadedState?: PreloadedState<RootState>
   store?: AppStore
}
const store = ({ preloadedState } = {}) => configureStore({ reducer: reducers, preloadedState })
function renderWithProviders(
   ui: React.ReactElement,
   {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = setupStore(preloadedState),
      ...renderOptions
   }: ExtendedRenderOptions = {}
) {
   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
      return <Provider store={store}>{children}</Provider>
   }
   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
// re-export everything
export * from '@testing-library/react'
// override render method
export { renderWithProviders }
export { store }
