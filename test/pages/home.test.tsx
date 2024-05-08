import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import { NavLink, createBrowserRouter, useNavigate, useRouteError, RouterProvider, Outlet } from 'react-router-dom'

import userEvent from '@testing-library/user-event'
import { Home } from "@/App"

vi.mock('@/homepage', async () => {
    const homepage = await vi.importActual('@/homepage')
    return {
        ...(homepage as object),
        findChannel: vi.fn(),
        navigate: vi.fn(),
    }
})
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as object),
        useNavigate: vi.fn()
    }
})

describe('test for home page', () => {
    it('click rewards button does not redirects', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        render(<Home />)

        const btn = await screen.findByRole('findChannelRewardsButton')
        await userEvent.click(btn)
        expect(mockNavigate).not.toHaveBeenCalled()
    })
    
    it('click redemption button does not redirects', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        render(<Home />)

        const btn = await screen.findByRole('findChannelRedemptionsButton')
        await userEvent.click(btn)
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('click rewards button redirects', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        render(<Home />)

        const channel = 'Channel'

        const input = await screen.findByRole('formControlFindChannel')
        await userEvent.type(input, channel)
        
        const btn = screen.getByRole('findChannelRewardsButton')
        await userEvent.click(btn)
        expect(mockNavigate).toHaveBeenCalledWith('/rewards/' + channel)
    })

    

    it('click redemption button redirects', async () => {
        const mockNavigate = vi.fn()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        render(<Home />)

        const channel = 'Channel'

        const input = await screen.findByRole('formControlFindChannel')
        await userEvent.type(input, channel)
        
        const btn = screen.getByRole('findChannelRedemptionsButton')
        await userEvent.click(btn)
        expect(mockNavigate).toHaveBeenCalledWith('/rewardHandler/' + channel)
    })
})