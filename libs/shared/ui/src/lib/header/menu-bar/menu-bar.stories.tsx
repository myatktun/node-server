import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { MenuBar } from "./menu-bar"

const Story: ComponentMeta<typeof MenuBar> = {
    component: MenuBar,
    title: "MenuBar",
}
export default Story

const Template: ComponentStory<typeof MenuBar> = (args) => <MenuBar {...args} />

export const Primary = Template.bind({})
Primary.args = {}
