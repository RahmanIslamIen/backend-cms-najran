import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PostPlain = t.Object(
  {
    id: t.String(),
    title: t.String(),
    slug: t.String(),
    content: t.String(),
    published: t.Boolean(),
    authorId: t.String(),
    categoryId: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const PostRelations = t.Object(
  {
    author: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: t.String(),
        password: t.String(),
        role: t.Union([t.Literal("USER"), t.Literal("ADMIN")], {
          additionalProperties: false,
        }),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    category: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          slug: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    comments: t.Array(
      t.Object(
        {
          id: t.String(),
          content: t.String(),
          postId: t.String(),
          authorId: __nullable__(t.String()),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const PostPlainInputCreate = t.Object(
  {
    title: t.String(),
    slug: t.String(),
    content: t.String(),
    published: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const PostPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    slug: t.Optional(t.String()),
    content: t.Optional(t.String()),
    published: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const PostRelationsInputCreate = t.Object(
  {
    author: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    category: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    comments: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const PostRelationsInputUpdate = t.Partial(
  t.Object(
    {
      author: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      category: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      comments: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const PostWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          title: t.String(),
          slug: t.String(),
          content: t.String(),
          published: t.Boolean(),
          authorId: t.String(),
          categoryId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Post" },
  ),
);

export const PostWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), slug: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ slug: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              title: t.String(),
              slug: t.String(),
              content: t.String(),
              published: t.Boolean(),
              authorId: t.String(),
              categoryId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Post" },
);

export const PostSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      slug: t.Boolean(),
      content: t.Boolean(),
      published: t.Boolean(),
      authorId: t.Boolean(),
      author: t.Boolean(),
      categoryId: t.Boolean(),
      category: t.Boolean(),
      comments: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PostInclude = t.Partial(
  t.Object(
    {
      author: t.Boolean(),
      category: t.Boolean(),
      comments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PostOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      published: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      authorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Post = t.Composite([PostPlain, PostRelations], {
  additionalProperties: false,
});

export const PostInputCreate = t.Composite(
  [PostPlainInputCreate, PostRelationsInputCreate],
  { additionalProperties: false },
);

export const PostInputUpdate = t.Composite(
  [PostPlainInputUpdate, PostRelationsInputUpdate],
  { additionalProperties: false },
);
