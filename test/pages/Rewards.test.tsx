import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import { Rewards } from "@/pages/Rewards"
import { ChannelResult, useChannel } from "ably/react"
import { TextToSpeechReward } from "@/components/TextToSpeechReward"

vi.mock('ably/react', async () => {
    const actual = await vi.importActual('ably/react')
    return {
        ...(actual as object),
        useChannel: vi.fn(),
    }
})
vi.mock('@/components/TextToSpeechReward', () => {
    return {
        TextToSpeechReward: vi.fn() as typeof TextToSpeechReward
    }
})

describe('test for Rewards page', () => {
    it('loads Rewards', async () => {
        vi.mocked(useChannel).mockReturnValue({} as ChannelResult)

        render(<Rewards />)

        const rewardsHeader = await screen.findByRole('rewardsHeader')
        expect(rewardsHeader).toBeInTheDocument()

        expect(useChannel).toHaveBeenCalled()
    })
})