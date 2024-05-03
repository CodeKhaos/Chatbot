import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import { Homepage } from '@/pages/Homepage'
import userEvent from '@testing-library/user-event'

vi.mock('@/homepage', async () => {
    const homepage = await vi.importActual('@/homepage')
    return {
        ...(homepage as object),
        findChannel: vi.fn()
    }
})

describe('test for home page', () => {
    it('loads homepage', async () => {
        render(<Homepage/>)
        const home = await screen.findByRole('homepage')
        expect(home).toBeInTheDocument()

        const findChannelButton = screen.getByRole('findChannelButton')
        expect(findChannelButton).toBeInTheDocument()

        const formControlFindChannel = screen.getByRole('formControlFindChannel')
        expect(formControlFindChannel).toBeInTheDocument()
    })

    it('loads channel page on click', async () => {
        const btn = await screen.findByRole('findChannelButton')
        await userEvent.click(btn)
       // expect(findChannel).toHaveBeenCalled()
    })
})