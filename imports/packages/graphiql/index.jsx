import React, { Component, createRef, useState, useEffect } from "react";
import GraphiQL from "graphiql";
import GraphiQLExplorer from "graphiql-explorer";
import { buildClientSchema, getIntrospectionQuery, parse } from "graphql";

import { makeDefaultArg, getDefaultScalarArgValue, generateGraphiqlFetcher } from "./methods";

import "graphiql/graphiql.css";

export { generateGraphiqlFetcher };

const _handleInspectOperation = (query) => (
  cm,
  mousePos
) => {
  const parsedQuery = parse(query || "");

  if (!parsedQuery) {
    console.error("Couldn't parse query document");
    return null;
  }

  var token = cm.getTokenAt(mousePos);
  var start = { line: mousePos.line, ch: token.start };
  var end = { line: mousePos.line, ch: token.end };
  var relevantMousePos = {
    start: cm.indexFromPos(start),
    end: cm.indexFromPos(end)
  };

  var position = relevantMousePos;

  var def = parsedQuery.definitions.find(definition => {
    if (!definition.loc) {
      return false;
    }

    const { start, end } = definition.loc;
    return start <= position.start && end >= position.end;
  });

  if (!def) {
    console.error(
      "Unable to find definition corresponding to mouse position"
    );
    return null;
  }

  var operationKind =
    def.kind === "OperationDefinition"
      ? def.operation
      : def.kind === "FragmentDefinition"
      ? "fragment"
      : "unknown";

  var operationName =
    def.kind === "OperationDefinition" && !!def.name
      ? def.name.value
      : def.kind === "FragmentDefinition" && !!def.name
      ? def.name.value
      : "unknown";

  var selector = `.graphiql-explorer-root #${operationKind}-${operationName}`;

  var el = document.querySelector(selector);
  el && el.scrollIntoView();
};

export default ({
  query,
  setQuery,
  explorerIsOpen,
  setExplorerIsOpen,
  fetcher,
}) => {
  const _graphiql = createRef();
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    if (explorerIsOpen && _graphiql.current) {
      fetcher({
        query: getIntrospectionQuery()
      }).then(result => {
        const editor = _graphiql.current.getQueryEditor();
        editor.setOption("extraKeys", {
          ...(editor.options.extraKeys || {}),
          "Shift-Alt-LeftClick": _handleInspectOperation(query)
        });
        setSchema(buildClientSchema(result.data));
      });
    }
  }, [explorerIsOpen]);

  return <div className="graphiql-container" style={{ position: 'absolute' }}>
    {process.browser && <>
      <GraphiQLExplorer
        schema={schema}
        query={query}
        onEdit={setQuery}
        onRunOperation={operationName =>
          _graphiql.current.handleRunQuery(operationName)
        }
        explorerIsOpen={explorerIsOpen}
        onToggleExplorer={() => setExplorerIsOpen(!explorerIsOpen)}
        getDefaultScalarArgValue={getDefaultScalarArgValue}
        makeDefaultArg={makeDefaultArg}
      />
      <GraphiQL
        ref={_graphiql}
        fetcher={fetcher}
        schema={schema}
        query={query}
        onEditQuery={setQuery}
      >
        <GraphiQL.Toolbar>
          <GraphiQL.Button
            onClick={() => _graphiql.current.handlePrettifyQuery()}
            label="Prettify"
            title="Prettify Query (Shift-Ctrl-P)"
          />
          <GraphiQL.Button
            onClick={() => _graphiql.current.handleToggleHistory()}
            label="History"
            title="Show History"
          />
          <GraphiQL.Button
            onClick={() => setExplorerIsOpen(!explorerIsOpen)}
            label="Explorer"
            title="Toggle Explorer"
          />
        </GraphiQL.Toolbar>
      </GraphiQL>
    </>}
  </div>;
};
