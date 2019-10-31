/**
 * All types of token reads by TokenReader.
 */
export enum Token {
  /**
   * EOF of JSON document.
   */
  END_DOCUMENT,

  /**
   * Beginning of object: {
   */
  BEGIN_OBJECT,

  /**
   * End of object: }
   */
  END_OBJECT,

  /**
   * Beginning of array: [
   */
  BEGIN_ARRAY,

  /**
   * End of array: ]
   */
  END_ARRAY,

  /**
   * Separator ':'
   */
  SEP_COLON,

  /**
   * Separator ','
   */
  SEP_COMMA,

  /**
   * String value: "xxx"
   */
  STRING,

  /**
   * Boolean value: true or false.
   */
  BOOLEAN,

  /**
   * Number value: 123.456
   */
  NUMBER,

  /**
   * Null value: null.
   */
  NULL,
}
