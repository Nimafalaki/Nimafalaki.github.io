'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: ComponentProps<'p'>) => (
        <p className="mb-3 last:mb-0">{children}</p>
    ),

    ul: ({ children }: ComponentProps<'ul'>) => (
        <ul className="list-disc list-inside mb-3 space-y-1">
            {children}
        </ul>
    ),

    ol: ({ children }: ComponentProps<'ol'>) => (
        <ol className="list-decimal list-inside mb-3 space-y-1">
            {children}
        </ol>
    ),

    li: ({ children }: ComponentProps<'li'>) => (
        <li className="mb-1">{children}</li>
    ),

    a: ({ ...props }: ComponentProps<'a'>) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),

    blockquote: ({ children }: ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),

    strong: ({ children }: ComponentProps<'strong'>) => (
        <strong className="font-semibold text-primary">
            {children}
        </strong>
    ),

    em: ({ children }: ComponentProps<'em'>) => (
        <em className="italic">{children}</em>
    ),

    code: ({ children }: ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">
            {children}
        </code>
    ),
};

export default function CardPage({
    config,
    embedded = false,
}: {
    config: CardPageConfig;
    embedded?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* Page Header */}
            <div className={embedded ? 'mb-4' : 'mb-8'}>
                <h1
                    className={`${
                        embedded ? 'text-2xl' : 'text-4xl'
                    } font-serif font-bold text-primary mb-4`}
                >
                    {config.title}
                </h1>

                {config.description && (
                    <div
                        className={`${
                            embedded ? 'text-base' : 'text-lg'
                        } text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}
                    >
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Cards */}
            <div className={`grid ${embedded ? 'gap-4' : 'gap-6'}`}>
                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1 * index,
                        }}
                        className={`
                            bg-white
                            dark:bg-neutral-900
                            ${embedded ? 'p-4' : 'p-6'}
                            rounded-xl
                            shadow-sm
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            hover:shadow-lg
                            transition-all
                            duration-200
                            hover:scale-[1.01]
                        `}
                    >
                        <div
                            className={
                                item.image
                                    ? 'flex flex-col sm:flex-row gap-5'
                                    : ''
                            }
                        >
                            {/* Project Image */}
                            {item.image && (
                                <div
                                    className="
                                        relative
                                        w-full
                                        sm:w-52
                                        h-44
                                        sm:h-40
                                        flex-shrink-0
                                        rounded-lg
                                        overflow-hidden
                                        border
                                        border-neutral-200
                                        dark:border-neutral-800
                                        bg-neutral-100
                                        dark:bg-neutral-800
                                    "
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 208px"
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Card Content */}
                            <div className="flex-1 min-w-0">
                                {/* Title + Date */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-2">
                                    <h3
                                        className={`${
                                            embedded
                                                ? 'text-lg'
                                                : 'text-xl'
                                        } font-semibold text-primary`}
                                    >
                                        {item.title}
                                    </h3>

                                    {item.date && (
                                        <span
                                            className="
                                                self-start
                                                text-sm
                                                text-neutral-500
                                                font-medium
                                                bg-neutral-100
                                                dark:bg-neutral-800
                                                px-2
                                                py-1
                                                rounded
                                                whitespace-nowrap
                                            "
                                        >
                                            {item.date}
                                        </span>
                                    )}
                                </div>

                                {/* Subtitle */}
                                {item.subtitle && (
                                    <p
                                        className={`${
                                            embedded
                                                ? 'text-sm'
                                                : 'text-base'
                                        } text-accent font-medium mb-3`}
                                    >
                                        {item.subtitle}
                                    </p>
                                )}

                                {/* Description */}
                                {item.content && (
                                    <div
                                        className={`${
                                            embedded
                                                ? 'text-sm'
                                                : 'text-base'
                                        } text-neutral-600 dark:text-neutral-500 leading-relaxed`}
                                    >
                                        <ReactMarkdown
                                            components={
                                                markdownComponents
                                            }
                                        >
                                            {item.content}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {/* Tags */}
                                {item.tags &&
                                    item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {item.tags.map(
                                                (tag) => (
                                                    <span
                                                        key={tag}
                                                        className="
                                                            text-xs
                                                            text-neutral-500
                                                            bg-neutral-50
                                                            dark:bg-neutral-800/50
                                                            px-2
                                                            py-1
                                                            rounded
                                                            border
                                                            border-neutral-100
                                                            dark:border-neutral-800
                                                        "
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}