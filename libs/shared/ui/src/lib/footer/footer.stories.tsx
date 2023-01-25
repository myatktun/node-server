import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { Footer } from "./footer"

const Story: ComponentMeta<typeof Footer> = {
    component: Footer,
    title: "Footer",
}
export default Story

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Primary = Template.bind({})
Primary.args = {}
