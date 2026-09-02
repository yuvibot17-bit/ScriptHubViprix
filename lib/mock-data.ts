export type ScriptCategory = "Free" | "Premium" | "Key System"

export type Script = {
  id: string
  name: string
  description: string
  version: string
  game: string
  author: string
  category: ScriptCategory
  downloads: number
  updatedAt: string
  code: string
}

export type KeyTier = "trial" | "monthly" | "lifetime"
export type KeyStatus = "active" | "inactive" | "expired"

export type LicenseKey = {
  id: string
  key: string
  tier: KeyTier
  status: KeyStatus
  createdAt: string
  expiresAt: string | null
  boundTo: string | null
}

export type UserRole = "admin" | "moderator" | "user"

export type AppUser = {
  id: string
  username: string
  discord: string
  role: UserRole
  joinedAt: string
  keysOwned: number
}

export type Announcement = {
  id: string
  title: string
  body: string
  date: string
  tag: "Update" | "Notice" | "Release"
}

export const stats = {
  scripts: 148,
  users: 12904,
  downloads: 486213,
  uptime: "99.98%",
}

const sampleLua = `-- Auto Farm Utility (example)
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local Config = {
    Enabled = true,
    Delay = 0.35,
    MaxRange = 120,
}

local function collect(target)
    if not target then return end
    local root = player.Character
        and player.Character:FindFirstChild("HumanoidRootPart")
    if root then
        root.CFrame = target.CFrame
    end
end

while Config.Enabled do
    for _, item in ipairs(workspace:GetChildren()) do
        if item:IsA("Model") and item.Name == "Collectible" then
            collect(item)
            task.wait(Config.Delay)
        end
    end
    task.wait(1)
end`

export const scripts: Script[] = [
  {
    id: "scr_01",
    name: "Nebula Farm Suite",
    description: "Configurable resource utility with a clean settings panel and safe-mode toggles.",
    version: "2.4.1",
    game: "Universal",
    author: "viprix",
    category: "Premium",
    downloads: 48213,
    updatedAt: "2026-08-21",
    code: sampleLua,
  },
  {
    id: "scr_02",
    name: "Aurora UI Library",
    description: "Lightweight, dependency-free UI library for building script menus quickly.",
    version: "1.9.0",
    game: "Universal",
    author: "lumen",
    category: "Free",
    downloads: 96420,
    updatedAt: "2026-08-30",
    code: sampleLua,
  },
  {
    id: "scr_03",
    name: "Sentinel Anti-AFK",
    description: "Keeps sessions alive with configurable intervals and jitter to feel natural.",
    version: "3.0.2",
    game: "Universal",
    author: "viprix",
    category: "Free",
    downloads: 132980,
    updatedAt: "2026-07-14",
    code: sampleLua,
  },
  {
    id: "scr_04",
    name: "Prism ESP Toolkit",
    description: "Modular overlay framework with drawing helpers and performance throttling.",
    version: "4.1.0",
    game: "Blox Fruits",
    author: "kairo",
    category: "Key System",
    downloads: 27140,
    updatedAt: "2026-08-11",
    code: sampleLua,
  },
  {
    id: "scr_05",
    name: "Quantum Teleporter",
    description: "Waypoint manager with saved locations and smooth transitions.",
    version: "1.2.3",
    game: "Pet Simulator",
    author: "mira",
    category: "Premium",
    downloads: 18902,
    updatedAt: "2026-08-25",
    code: sampleLua,
  },
  {
    id: "scr_06",
    name: "Echo Config Loader",
    description: "Persist and share settings profiles via encoded config strings.",
    version: "0.8.4",
    game: "Universal",
    author: "lumen",
    category: "Free",
    downloads: 40311,
    updatedAt: "2026-06-29",
    code: sampleLua,
  },
]

export const keys: LicenseKey[] = [
  {
    id: "key_01",
    key: "VPRX-TRIAL-8F2K-QW1Z",
    tier: "trial",
    status: "active",
    createdAt: "2026-09-01",
    expiresAt: "2026-09-02",
    boundTo: "shadow#0001",
  },
  {
    id: "key_02",
    key: "VPRX-MNTH-4KD9-LP7A",
    tier: "monthly",
    status: "active",
    createdAt: "2026-08-12",
    expiresAt: "2026-09-12",
    boundTo: "nova#4420",
  },
  {
    id: "key_03",
    key: "VPRX-LIFE-ZX01-MB33",
    tier: "lifetime",
    status: "active",
    createdAt: "2026-05-03",
    expiresAt: null,
    boundTo: "kairo#1010",
  },
  {
    id: "key_04",
    key: "VPRX-MNTH-77QP-AA2C",
    tier: "monthly",
    status: "expired",
    createdAt: "2026-06-01",
    expiresAt: "2026-07-01",
    boundTo: "mira#9931",
  },
  {
    id: "key_05",
    key: "VPRX-TRIAL-QQ5R-19DL",
    tier: "trial",
    status: "inactive",
    createdAt: "2026-09-01",
    expiresAt: null,
    boundTo: null,
  },
]

export const users: AppUser[] = [
  { id: "usr_01", username: "viprix", discord: "viprix#0001", role: "admin", joinedAt: "2025-11-02", keysOwned: 12 },
  { id: "usr_02", username: "lumen", discord: "lumen#3321", role: "moderator", joinedAt: "2026-01-18", keysOwned: 4 },
  { id: "usr_03", username: "kairo", discord: "kairo#1010", role: "user", joinedAt: "2026-03-22", keysOwned: 1 },
  { id: "usr_04", username: "mira", discord: "mira#9931", role: "user", joinedAt: "2026-04-09", keysOwned: 2 },
  { id: "usr_05", username: "nova", discord: "nova#4420", role: "user", joinedAt: "2026-07-30", keysOwned: 1 },
]

export const announcements: Announcement[] = [
  {
    id: "ann_01",
    title: "Nebula Farm Suite v2.4.1 released",
    body: "Improved safe-mode detection and reduced memory usage by 22%. Update recommended for all users.",
    date: "2026-08-21",
    tag: "Release",
  },
  {
    id: "ann_02",
    title: "Scheduled maintenance",
    body: "The key validation API will be briefly unavailable Sept 5, 02:00–02:30 UTC for a database migration.",
    date: "2026-08-28",
    tag: "Notice",
  },
  {
    id: "ann_03",
    title: "New dashboard analytics",
    body: "Admins can now view per-script download trends and key redemption rates in the dashboard.",
    date: "2026-08-15",
    tag: "Update",
  },
]

export const analytics = {
  downloadsByDay: [
    { day: "Mon", value: 3200 },
    { day: "Tue", value: 4100 },
    { day: "Wed", value: 3860 },
    { day: "Thu", value: 5230 },
    { day: "Fri", value: 6110 },
    { day: "Sat", value: 7420 },
    { day: "Sun", value: 6890 },
  ],
  keysByTier: [
    { tier: "Trial", value: 62 },
    { tier: "Monthly", value: 128 },
    { tier: "Lifetime", value: 44 },
  ],
}
