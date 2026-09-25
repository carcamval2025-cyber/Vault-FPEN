.fpen_msg_error <- function(e) {
  if (inherits(e, "rlang_error")) {
    txt <- strsplit(paste(format(e, backtrace = FALSE), collapse = "\n"), "\n", fixed = TRUE)[[1]]
    txt <- paste(txt[!grepl("^<error", txt)], collapse = "\n")
    return(if (startsWith(txt, "Error")) txt else paste0("Error: ", txt))
  }
  cl <- conditionCall(e)
  txt <- if (is.null(cl)) "" else paste(deparse(cl), collapse = " ")
  if (!nzchar(txt) || grepl("^(eval|withVisible|withCallingHandlers|doTryCatch)\\(", txt))
    paste0("Error: ", conditionMessage(e))
  else paste0("Error in ", txt, " : ", conditionMessage(e))
}
.fpen_correr <- function(.codigo, .env) {
  .exprs <- tryCatch(parse(text = .codigo, keep.source = FALSE), error = function(e) {
    message("Error: ", sub("^<text>:[0-9]+:[0-9]+: ", "", conditionMessage(e))); NULL })
  if (is.null(.exprs)) return(invisible(FALSE))
  for (.i in seq_along(.exprs)) {
    .avisos <- character(0)
    .ok <- tryCatch(withCallingHandlers({
      .r <- withVisible(eval(.exprs[[.i]], .env))
      if (.r$visible) print(.r$value)
      TRUE
    }, warning = function(w) {
      cl <- conditionCall(w)
      txt <- if (is.null(cl)) "" else paste(deparse(cl), collapse = " ")
      .avisos <<- c(.avisos, if (!nzchar(txt) || grepl("^(eval|withVisible)\\(", txt)) conditionMessage(w)
                    else paste0("In ", txt, " :\n  ", conditionMessage(w)))
      invokeRestart("muffleWarning")
    }), error = function(e) { message(.fpen_msg_error(e)); FALSE })
    if (length(.avisos) == 1) message("Warning message:\n", .avisos)
    if (length(.avisos) > 1) message("Warning messages:\n", paste0(seq_along(.avisos), ": ", .avisos, collapse = "\n"))
    if (!isTRUE(.ok)) return(invisible(FALSE))
  }
  invisible(TRUE)
}
