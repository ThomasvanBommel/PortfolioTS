/*
 * File: eventTypes.ts
 * Created: Saturday April 3rd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 10:25am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

export type Event = {
    id: number,
    type: string,
    actor: {
        id: number,
        login: string,
        display_login: string,
        gravatar_id: string,
        url: string,
        avatar_url: string
    },
    repo: {
        id: number,
        name: string,
        url: string
    },
    public: boolean,
    created_at: string
};

export type Commit = {
    sha: string,
    author: {
        email: string,
        name: string
    },
    message: string,
    distinct: boolean,
    url: string
};

export type PushEvent = Event & {
    payload: {
        push_id: number,
        size: number,
        distinct_size: number,
        ref: string,
        head: string,
        before: string,
        commits: Commit[]
    }
};

export type CreateEvent = Event & {
    payload: {
        ref: string,
        ref_type: string,
        master_branch: string,
        description: string,
        pusher_type: string
    }
};

export type DeleteEvent = Event & {
    payload: {
        ref: string,
        ref_type: string,
        pusher_type: string
    }
};

export type User = {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
};

export type Issue = {
    url: string,
    repository_url: string,
    labels_url: string,
    comments_url: string,
    html_url: string,
    id: number,
    node_id: string,
    title: string,
    user: User,
    labels: {
        id: number,
        node_id: string,
        url: string,
        name: string,
        color: string,
        default: boolean,
        description: string,
    }[],
    state: string,
    locked: boolean,
    assignee: User,
    assignees: User[],
    milestone: unknown,
    comments: number,
    created_at: string,
    updated_at: string,
    closed_at: string,
    author_association: string,
    active_lock_reason: unknown,
    body: string,
    performed_via_github_app: unknown
};

export type IssuesEvent = Event & {
    payload: {
        action: string,
        issue: Issue
    }
};

export type IssueCommentEvent = Event & {
    payload: {
        action: string,
        issue: Issue,
        comment: {
            url: string,
            html_url: string,
            issue_url: string,
            id: number,
            node_id: string,
            user: User,
            created_at: string,
            updated_at: string,
            author_association: string,
            body: string,
            performed_via_github_app: unknown
        }
    }
};