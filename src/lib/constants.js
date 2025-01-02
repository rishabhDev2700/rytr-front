export const STATUS = [
    { index: 0, text: "Not started", color: "#d1d1d1" },
    { index: 1, text: "Ongoing", color: "#8affd4" },
    { index: 2, text: "Finished", color: "#8ab7ff" },
    { index: 3, text: "Halted", color: "#ffa1a1" },
];
export const cards = [
    {
        id: 0,
        title: "Card 1",
        description: "This is the fourth card.",
        status: 1,
        created_on: new Date("2024-12-04T11:15:00Z"),
        updated_at: new Date("2024-12-08T13:20:00Z"),
    },
    {
        id: 1,
        title: "Card 4",
        description: "This is the first card.",
        status: 1,
        created_on: new Date("2024-12-01T10:00:00Z"),
        updated_at: new Date("2024-12-05T15:30:00Z"),
    },
    {
        id: 2,
        title: "Card 2",
        description: "This is the second card.",
        status: 2,
        created_on: new Date("2024-12-02T12:00:00Z"),
        updated_at: new Date("2024-12-06T14:00:00Z"),
    },
    {
        id: 3,
        title: "Card 3",
        description: "This is the third card.",
        status: 3,
        created_on: new Date("2024-12-03T08:30:00Z"),
        updated_at: new Date("2024-12-07T16:45:00Z"),
    },
];


export const animation = {
opacity:[0,100]
}
export const transition = {
    duration:0.5
}