'use client';
import { Link } from 'lucide-react';
import { notFound, useSearchParams } from 'next/navigation';

const allPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `This is the content of post ${i + 1}`,
}));

export default function PostsPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 10;

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (currentPage < 1 || currentPage > totalPages) return notFound();

  const start = (currentPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(start, start + postsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Posts (Page {currentPage})</h1>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <Pagination totalPosts={totalPosts} postsPerPage={postsPerPage} />
    </div>
  );
}



type Props = {
  totalPosts: number;
  postsPerPage: number;
};

const Pagination: React.FC<Props> = ({ totalPosts, postsPerPage }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      {pages.map((num) => (
        <Link
          key={num}
          href={`?page=${num}`}
          style={{
            padding: '8px 12px',
            background: currentPage === num ? 'black' : '#ccc',
            color: currentPage === num ? 'white' : 'black',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          {num}
        </Link>
      ))}
    </div>
  );
};

