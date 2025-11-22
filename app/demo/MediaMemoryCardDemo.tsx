'use client';

import * as React from 'react';

type DemoCard = {
	id: string;
	title: string;
	videoUrl: string;
	notes: string;
	savedAt?: string;
};

type DraftCard = {
	title: string;
	videoUrl: string;
	notes: string;
};

export function MediaMemoryCardDemo() {
	const [cards, setCards] = React.useState<DemoCard[]>(() => getInitialCards());
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [draft, setDraft] = React.useState<DraftCard>({ title: '', videoUrl: '', notes: '' });
	const [error, setError] = React.useState<string | null>(null);

	const handleCardSave = React.useCallback(async (id: string, notes: string) => {
		await pretendPersist();
		setCards((prev) =>
			prev.map((card) =>
				card.id === id
					? {
						...card,
						notes,
						savedAt: new Date().toISOString(),
					}
					: card,
			),
		);
	}, []);

	const handleAddCard = React.useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setError(null);

			if (!draft.title.trim()) {
				setError('A title is required.');
				return;
			}

			await pretendPersist();
			setCards((prev) => [
				{
					id: crypto.randomUUID?.() ?? `card-${Date.now()}`,
					title: draft.title.trim(),
					videoUrl: draft.videoUrl.trim(),
					notes: draft.notes.trim(),
					savedAt: new Date().toISOString(),
				},
				...prev,
			]);
			setDraft({ title: '', videoUrl: '', notes: '' });
			setIsModalOpen(false);
		},
		[draft],
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-600">Add, edit, and save cards locally to mimic the intended UX.</p>
				<button
					onClick={() => {
						setDraft({ title: '', videoUrl: '', notes: '' });
						setError(null);
						setIsModalOpen(true);
					}}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
				>
					Add Content
				</button>
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				{cards.map((card) => (
					<MemoryCard key={card.id} card={card} onSave={handleCardSave} />
				))}
			</div>

			{isModalOpen ? (
				<Modal onDismiss={() => setIsModalOpen(false)}>
					<form className="space-y-4" onSubmit={handleAddCard}>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="title">
								Title
							</label>
							<input
								type="text"
								id="title"
								value={draft.title}
								onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
								placeholder="Sample YouTube Video"
								required
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="videoUrl">
								YouTube URL (optional)
							</label>
							<input
								type="url"
								id="videoUrl"
								value={draft.videoUrl}
								onChange={(event) => setDraft((prev) => ({ ...prev, videoUrl: event.target.value }))}
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
								placeholder="https://www.youtube.com/watch?v=d5x0JCZbAJs"
								pattern="https?://.*"
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="notes">
								Notes
							</label>
							<textarea
								id="notes"
								value={draft.notes}
								onChange={(event) => setDraft((prev) => ({ ...prev, notes: event.target.value }))}
								className="h-32 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
								placeholder="Add your notes here..."
							/>
						</div>
						{error ? <p className="text-sm text-red-600">{error}</p> : null}
						<div className="flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setIsModalOpen(false)}
								className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
							>
								Create Card
							</button>
						</div>
					</form>
				</Modal>
			) : null}
		</div>
	);
}

function MemoryCard({ card, onSave }: { card: DemoCard; onSave: (id: string, notes: string) => Promise<void> }) {
	const [draft, setDraft] = React.useState(card.notes);
	const [saving, setSaving] = React.useState(false);
	const [showVideo, setShowVideo] = React.useState(false);

	React.useEffect(() => {
		setDraft(card.notes);
	}, [card.id, card.notes]);

	const embedUrl = getYouTubeEmbed(card.videoUrl);

	const handleSave = React.useCallback(async () => {
		if (draft.trim() === card.notes.trim()) {
			return;
		}
		setSaving(true);
		await onSave(card.id, draft.trim());
		setSaving(false);
	}, [card.id, card.notes, draft, onSave]);

	return (
		<div className="w-full max-h-[400px] h-[400px] px-3 py-0.5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
			<div className="flex h-full flex-col justify-between">
				<div className="h-14 w-full p-3 text-lg font-semibold truncate" title={card.title}>
					{card.title || 'Untitled Card'}
				</div>
				<div className="flex h-72 w-full justify-between gap-1 p-1">
					<div className="flex-1 min-w-0 rounded-md border border-neutral-500 px-3">
						<div className="flex items-center justify-between py-1.5">
							<h4 className="text-sm font-medium">Notes</h4>
							{card.savedAt ? (
								<span className="text-xs text-gray-500">Saved {formatTime(card.savedAt)}</span>
							) : null}
						</div>
						<textarea
							className="h-48 w-full resize-none overflow-auto rounded-l-lg border border-black px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
							value={draft}
							onChange={(event) => setDraft(event.target.value)}
							placeholder="Add your notes here..."
						/>
						<div className="flex w-full justify-end gap-2 p-1 px-2">
							<button
								type="button"
								onClick={handleSave}
								disabled={saving || draft.trim() === card.notes.trim()}
								className="rounded-md bg-blue-600 px-5 py-1 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{saving ? 'Saving…' : 'Save'}
							</button>
						</div>
					</div>
					<div className="aspect-video w-[345px] min-w-0 overflow-hidden rounded-md bg-black">
						{embedUrl ? (
							showVideo ? (
								<iframe
									title={card.title || 'Video preview'}
									className="h-full w-full"
									src={embedUrl}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							) : (
								<button
									type="button"
									className="flex h-full w-full items-center justify-center text-white"
									onClick={() => setShowVideo(true)}
								>
									<span className="rounded bg-white/10 px-4 py-2 backdrop-blur">Load video</span>
								</button>
							)
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gray-900 text-sm text-gray-300">
								No video URL
							</div>
						)}
					</div>
				</div>
				<div className="h-14 w-full" />
			</div>
		</div>
	);
}

function Modal({ children, onDismiss }: { children: React.ReactNode; onDismiss: () => void }) {
	React.useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onDismiss();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onDismiss]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold">Create a new card</h2>
					<button
						type="button"
						onClick={onDismiss}
						className="text-sm text-gray-500 hover:text-gray-700"
						aria-label="Close"
					>
						✕
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

function getInitialCards(): DemoCard[] {
	return [
		{
			id: 'card-1',
			title: 'Sample YouTube Video',
			videoUrl: 'https://www.youtube.com/watch?v=d5x0JCZbAJs',
			notes: 'Capture highlights or action items from the clip right here. Update and save to mimic persistence.',
			savedAt: new Date().toISOString(),
		},
	];
}

function getYouTubeEmbed(url: string): string | null {
	if (!url) return null;
	try {
		const parsed = new URL(url);
		if (parsed.hostname.includes('youtube.com')) {
			const id = parsed.searchParams.get('v');
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}
		if (parsed.hostname.includes('youtu.be')) {
			const id = parsed.pathname.replace('/', '');
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}
		return null;
	} catch {
		return null;
	}
}

function formatTime(isoDate: string): string {
	try {
		return new Date(isoDate).toLocaleTimeString();
	} catch {
		return 'just now';
	}
}

async function pretendPersist(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 400));
}
