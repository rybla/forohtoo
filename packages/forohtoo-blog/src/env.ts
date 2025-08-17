import z from "zod";

const RECEIVER_ADDRESS = z.string().transform((s) => {
    if (!s.startsWith("0x"))
        throw new z.ZodError([
            {
                path: ["RECEIVER_ADDRESS"],
                code: "custom",
                message: "Invalid address",
            } as const,
        ]);
    return s as `0x${string}`;
})

const envSchema = z.union([
    z.object({
        TEST: z.literal("true"),
        RECEIVER_ADDRESS: RECEIVER_ADDRESS,
        COINBASE_DEVELOPER_PLATFORM_CLIENT_PUBLIC_KEY: z.string(),
    }).loose(),
    z.object({
        TEST: z.literal("false"),
        RECEIVER_ADDRESS: RECEIVER_ADDRESS,
        COINBASE_DEVELOPER_PLATFORM_CLIENT_PUBLIC_KEY: z.string(),
    }).loose()
])

export const env = envSchema.parse(process.env);
export default env;
