import * as React from 'react'
import { useRoutes } from 'react-router-dom'
import BasicLayout from '@/layouts/basic-layout'
import Home from '@/pages/home'
import Basics from '@/pages/basics'
import Browser from '@/pages/browser'
import Communication from '@/pages/communication'
import Engineering from '@/pages/engineering'
import Frame from '@/pages/frame'
import Node from '@/pages/node'
import type { RouteObjectWithTitle } from '@proj/react-components'
import LinkedList from '@/pages/datastructure/linked-list'
import SortSearch from '@/pages/algorithm/sort-search'
import DivideConquer from '@/pages/algorithm/divide-conquer'
import DynamicProgramming from '@/pages/algorithm/dynamic-programming'
import Greedy from '@/pages/algorithm/greedy'
import Backtracking from '@/pages/algorithm/backtracking'
import Handwriting from '@/pages/basics/handwriting'

// routes 配置方法：https://reactrouter.com/en/v6.3.0/api#useroutes
export const routes = [
    {
        path: 'home',
        title: '首页',
        element: <Home />,
        children: [],
    },
    {
        path: '/',
        element: <BasicLayout />,
        children: [
            {
                path: 'basics',
                title: '基础',
                children: [
                    {
                        path: 'handwriting',
                        title: '手写题',
                        element: <Handwriting />,
                    },
                ],
            },
            {
                path: 'datastructure',
                title: '数据结构',
                children: [
                    {
                        path: 'linked-list',
                        title: '链表',
                        element: <LinkedList />,
                    },
                ],
            },
            {
                path: 'algorithm',
                title: '算法',
                children: [
                    {
                        path: 'sort-search',
                        title: '排序&搜索',
                        element: <SortSearch />,
                    },
                    {
                        path: 'divide-conquer',
                        title: '分治',
                        element: <DivideConquer />,
                    },
                    {
                        path: 'dynamic-programming',
                        title: '动态规划',
                        element: <DynamicProgramming />,
                    },
                    {
                        path: 'greedy',
                        title: '贪心',
                        element: <Greedy />,
                    },
                    {
                        path: 'backtracking',
                        title: '回溯',
                        element: <Backtracking />,
                    },
                ],
            },
            {
                path: 'frame',
                title: '框架',
                element: <Frame />,
                children: [],
            },
            {
                path: 'communication',
                title: '通信',
                element: <Communication />,
                children: [],
            },
            {
                path: 'browser',
                title: '浏览器',
                element: <Browser />,
                children: [],
            },
            {
                path: 'engineering',
                title: '工程化',
                element: <Engineering />,
                children: [],
            },
            {
                path: 'node',
                title: 'Node',
                element: <Node />,
                children: [],
            },
        ],
    },
] as RouteObjectWithTitle[]

export const Routes = () => {
    const element = useRoutes(routes)
    return element
}
