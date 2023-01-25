import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { SharedUiHeader } from "./shared-ui-header"

const Story: ComponentMeta<typeof SharedUiHeader> = {
    component: SharedUiHeader,
    title: "SharedUiHeader",
}
export default Story

const Template: ComponentStory<typeof SharedUiHeader> = (args) => <SharedUiHeader {...args} />

export const Primary = Template.bind({})
Primary.args = {}
