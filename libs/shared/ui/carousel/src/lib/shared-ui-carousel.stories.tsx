import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { SharedUiCarousel } from "./shared-ui-carousel"

const Story: ComponentMeta<typeof SharedUiCarousel> = {
    component: SharedUiCarousel,
    title: "SharedUiCarousel",
}
export default Story

const Template: ComponentStory<typeof SharedUiCarousel> = (args) => <SharedUiCarousel {...args} />

export const Primary = Template.bind({})
Primary.args = {}
