'use client';

import * as React from 'react';

type TextLinkDemo = {
	title: string;
	link?: string;
	content: string;
	createdAt: string;
	tags: string[];
};

export function TextLinkMemoryCardDemo({ data }: { data: TextLinkDemo }) {
	const [expanded, setExpanded] = React.useState(false);

	const preview = expanded ? data.content : clampText(data.content, 280);

	return (
		<div className="rounded border p-4">
			<div className="mb-3 flex items-start justify-between">
				<h3 className="text-lg font-semibold">{data.title}</h3>
			</div>

			<div className="mb-3 space-y-2">
				{data.link ? (
					<a
						href={data.link}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-3 rounded border p-3 hover:bg-gray-50"
					>
						<Favicon url={data.link} />
						<div className="min-w-0">
							<div className="truncate text-sm font-medium">{getDomain(data.link)}</div>
							<div className="truncate text-xs text-gray-500">{data.link}</div>
						</div>
					</a>
				) : null}

				<p className="whitespace-pre-wrap text-sm text-gray-800">{preview}</p>
				{data.content.length > preview.length ? (
					<button className="text-sm text-blue-600" onClick={() => setExpanded((v) => !v)}>
						{expanded ? 'Show less' : 'Read more'}
					</button>
				) : null}
			</div>

			<div className="mt-4 flex items-center justify-between text-xs text-gray-500">
				<div className="flex flex-wrap gap-2">
					{data.tags.map((t) => (
						<span key={t} className="rounded bg-gray-100 px-2 py-0.5">{t}</span>
					))}
				</div>
				<time dateTime={data.createdAt}>{new Date(data.createdAt).toLocaleString()}</time>
			</div>
		</div>
	);
}

function clampText(text: string, maxChars: number): string {
	if (text.length <= maxChars) return text;
	return text.slice(0, Math.max(0, maxChars - 1)) + '…';
}

function getDomain(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return url;
	}
}

function Favicon({ url }: { url: string }) {
	const domain = getDomain(url);
	const src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
	return <img src={src} alt="" className="h-5 w-5 rounded" />;
}


