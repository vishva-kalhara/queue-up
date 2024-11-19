import { cva, VariantProps } from "class-variance-authority";

const spinnerVarients = cva(
    "border-4 rounded-full border-brand-200 border-t-zinc-800 animate-spin duration-700",
    {
        variants: {
            size: {
                sm: "size-4 border-2",
                md: "size-6 border-4",
                lg: "size-8 border-4",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVarients> {
    className?: string;
}

const LoadingSpinner = ({ className, size }: LoadingSpinnerProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className={spinnerVarients({ size, className })} />
        </div>
    );
};

export default LoadingSpinner;
