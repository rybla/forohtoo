import z from "zod";

const envSchema = z.union([
    z.object({
        TEST: z.literal("true"),
    }).loose(),
    z.object({
        TEST: z.literal("false"),
        COINBASE_DEVELOPER_PLATFORM_API_KEY: z.string(),
        COINBASE_DEVELOPER_PLATFORM_SECRET:z.string(),
        RECEIVER_ADDRESS: z.string().transform((s) => {
            if (!s.startsWith("0x"))
                throw new z.ZodError([
                    {
                        path: ["RECEIVER_ADDRESS"],
                        code: "custom",
                        message: "Invalid address",
                    } as const,
                ]);
            return s as `0x${string}`;
        }),
    }).loose()
])

export const env = envSchema.parse(process.env);
export default env;
