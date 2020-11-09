import React from 'react'

import {Drawer, Input, Row, Col, Form ,Button,Radio, Tooltip} from 'antd'
import {MenuItem} from 'src/types'
import { FormattedMessage } from 'react-intl'
import localeData from 'src/core/library/locale'
import { getState } from 'src/store/store'
interface Props {
    drawerVisible : boolean
    selectedNode: MenuItem
    onChange: any
    onCancelDrawer: any
}
 
const AddMenuItem = (props:Props) =>{
    const {selectedNode,drawerVisible} = props
    return (
        <Drawer
                title={<FormattedMessage id="team.addMenuTitle" values={{title:selectedNode && selectedNode.title}} /> }
                placement="right"
                closable={false}
                visible={drawerVisible}
                width={400}
                onClose={() =>props.onCancelDrawer() }
            >
                <Form layout="vertical" onFinish={(v) => props.onChange(v)} initialValues={{position: 1}}>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="id"
                                label={<FormattedMessage id="dashboard.uid"/>}
                            >   
                                <Tooltip title={<FormattedMessage id="team.uidTooltip" />}><Input placeholder="uid..."/></Tooltip>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="24">
                            <Form.Item
                                name="position"
                                label={<FormattedMessage id="team.addToPosition" />}
                            >
                                    <Radio.Group>
                                    <Radio.Button value={1}><FormattedMessage id="team.asBrother" /></Radio.Button>
                                    <Radio.Button value={2}><FormattedMessage id="team.asChild" /></Radio.Button>
                                </Radio.Group>
                            </Form.Item> 
                        </Col>
                        <Col span="24">
                            <Form.Item
                                name="icon"
                                label={<FormattedMessage id="common.iconName" />}
                            >
                                    <Tooltip title={<FormattedMessage id="team.iconTooltip" />}><Input placeholder="e.g : users-alt" /></Tooltip>
                            </Form.Item> 
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span="24">
                            <Form.Item
                                name="title"
                                label={<FormattedMessage id="team.menuName" />}
                            >
                                    <Input placeholder="e.g App monitoring" />
                            </Form.Item> 
                        </Col>
                        <Col span="24">
                            <Form.Item
                                name="url"
                                label={<FormattedMessage id="team.menuSubUrl" />}
                            >
                                    <Tooltip title={<FormattedMessage id="team.menuUrlTooltip" />}><Input placeholder="e.g  /app" /></Tooltip>
                            </Form.Item> 
                            <Button htmlType="submit" type="primary" className="ub-mt4" ghost block><FormattedMessage id="common.submit" /></Button>
                        </Col>
                    </Row>
                </Form>


            </Drawer>
    )
}

export default AddMenuItem