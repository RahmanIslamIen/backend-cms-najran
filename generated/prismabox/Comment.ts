import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CommentPlain = t.Object(
  {
    id: t.String(),
    content: t.String(),
    postId: t.String(),
    authorId: __nullable__(t.String()),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const CommentRelations = t.Object(
  {
    post: t.Object(
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
    ),
    author: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const CommentPlainInputCreate = t.Object(
  { content: t.String() },
  { additionalProperties: false },
);

export const CommentPlainInputUpdate = t.Object(
  { content: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const CommentRelationsInputCreate = t.Object(
  {
    post: t.Object(
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
    author: t.Optional(
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
  },
  { additionalProperties: false },
);

export const CommentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      post: t.Object(
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
      author: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const CommentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          content: t.String(),
          postId: t.String(),
          authorId: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Comment" },
  ),
);

export const CommentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
              content: t.String(),
              postId: t.String(),
              authorId: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Comment" },
);

export const CommentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      content: t.Boolean(),
      postId: t.Boolean(),
      post: t.Boolean(),
      authorId: t.Boolean(),
      author: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const CommentInclude = t.Partial(
  t.Object(
    { post: t.Boolean(), author: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const CommentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      postId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      authorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Comment = t.Composite([CommentPlain, CommentRelations], {
  additionalProperties: false,
});

export const CommentInputCreate = t.Composite(
  [CommentPlainInputCreate, CommentRelationsInputCreate],
  { additionalProperties: false },
);

export const CommentInputUpdate = t.Composite(
  [CommentPlainInputUpdate, CommentRelationsInputUpdate],
  { additionalProperties: false },
);
