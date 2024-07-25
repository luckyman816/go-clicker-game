export const mockData = [
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    },
    {
        name: "user_name",
        $GoXP: 500000
    }
];

export enum QuestType {
    FOLLOW_X = 'FOLLOW_X',
    JOIN_TELEGRAM = 'JOIN_TELEGRAM',
    JOIN_DISCORD = 'JOIN_DISCORD',
    VISIT_WEBSITE = 'VISIT_WEBSITE',
    SHARE_WALLET = 'SHARE_WALLET',
    SHARE_EMAIL = 'SHARE_EMAIL',
    RETWEET_X_POST = 'RETWEET_X_POST',
}

export type Quest = {
    icon: string,
    description: string,
    prize: number,
    type: QuestType,
    completed: boolean,
    link?: string,
    account?: string,
    wallet?: string,
    email?: string,
}

export const mockQuest: Quest[] = [
    {
        icon: "/image/icon/icon_twitter.svg",
        link: "https://x.com/gorwachain",
        description: "Follow our X account",
        prize: 125,
        type: QuestType.FOLLOW_X,
        completed: false,
        account: 'crozoasdf',
    },
    {
        icon: "/image/icon/icon_telegram.svg",
        link: "https://t.me/gorwachain",
        description: "Join our Telegram",
        prize: 125,
        type: QuestType.JOIN_TELEGRAM,
        completed: false,
    },
    {
        icon: "/image/icon/icon_discord.svg",
        link: "https://discord.gg/gorwachain",
        description: "Join our Discord",
        prize: 125,
        type: QuestType.JOIN_DISCORD,
        completed: false,
    },
    {
        icon: "/image/icon/icon_ether.svg",
        description: "Share your ETH wallet",
        prize: 100,
        type: QuestType.SHARE_WALLET,
        completed: false,
        wallet: '',
    },
    {
        icon: "/image/icon/icon_email.svg",
        description: "Share your email",
        prize: 100,
        type: QuestType.SHARE_EMAIL,
        completed: false,
        email: '',
    },
    {
        icon: "/image/icon/icon_website.svg",
        link: "https://goplatform.io",
        description: "Visit our website",
        prize: 50,
        type: QuestType.VISIT_WEBSITE,
        completed: true,
    },
    {
        icon: "/image/icon/icon_twitter.svg",
        link: "https://twitter.com/gorwachain",
        description: "RT X Post",
        prize: 50,
        type: QuestType.RETWEET_X_POST,
        completed: false,
    },

    {
        icon: "/image/icon/fire.svg",
        link: "https://chat.goplatform.io",
        description: "Visit our app page",
        prize: 125,
        type: QuestType.VISIT_WEBSITE,
        completed: false,
    },
    {
        icon: "/image/icon/fire.svg",
        link: "https://discord.gg/5uuspUuK?event=1244987452280537141",
        description: "Weekly Competition",
        prize: 125,
        type: QuestType.VISIT_WEBSITE,
        completed: false,
    },

    {
        icon: "/image/icon/fire.svg",
        link: "https://twitter.com/gorwachain",
        description: "Tag 3 Friends",
        prize: 125,
        type: QuestType.VISIT_WEBSITE,
        completed: false,
    },
    {
        icon: "/image/icon/fire.svg",
        link: "https://twitter.com/gorwachain",
        description: "Refer a friend",
        prize: 125,
        type: QuestType.VISIT_WEBSITE,
        completed: false,
    }
]







