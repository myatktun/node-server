import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { Carousel } from "./carousel"

const Story: ComponentMeta<typeof Carousel> = {
    component: Carousel,
    title: "Carousel",
}
export default Story

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />

export const Primary = Template.bind({})
Primary.args = {}
