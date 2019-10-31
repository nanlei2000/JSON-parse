export enum Status {
  /**
   * Should read EOF for next token.
   */
  EXPECT_END_DOCUMENT = 1 << 1,

  /**
   * Should read "{" for next token.
   */
  EXPECT_BEGIN_OBJECT = 1 << 2,

  /**
   * Should read "}" for next token.
   */
  EXPECT_END_OBJECT = 1 << 3,

  /**
   * Should read object key for next token.
   */
  EXPECT_OBJECT_KEY = 1 << 4,

  /**
   * Should read object value for next token.
   */
  EXPECT_OBJECT_VALUE = 1 << 5,

  /**
   * Should read ":" for next token.
   */
  EXPECT_COLON = 1 << 6,

  /**
   * Should read "," for next token.
   */
  EXPECT_COMMA = 1 << 7,

  /**
   * Should read "[" for next token.
   */
  EXPECT_BEGIN_ARRAY = 1 << 8,

  /**
   * Should read "]" for next token.
   */
  EXPECT_END_ARRAY = 1 << 9,

  /**
   * Should read array value for next token.
   */
  EXPECT_ARRAY_VALUE = 1 << 10,

  /**
   * Should read a single value for next token (must not be "{" or "[").
   */
  EXPECT_SINGLE_VALUE = 1 << 11,
}
