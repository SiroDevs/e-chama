export interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export interface Attachment {
    name: string;
}

export interface Person {
    name: string;
    role: string;
}

export interface TimelineItemProps {
    dotColor: string;
    title: string;
    time: string;
    description: string;
    attachment?: Attachment;
    person?: Person;
    avatarCount?: number;
    extraCount?: number;
}
