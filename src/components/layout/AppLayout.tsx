import type { ReactNode } from 'react'

import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <AppHeader />
            {children}
            <AppFooter />
        </>
    )
}

export default AppLayout