const CodeBlock = () => {
  return (
    <div className="bg-code-bg border border-code-border rounded-lg overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-muted-foreground text-xs">developer.js</span>
      </div>

      {/* Code Content */}
      <div className="p-4 space-y-1 text-xs md:text-sm leading-relaxed">
        <div>
          <span className="syntax-keyword">class</span>{" "}
          <span className="syntax-function">Developer</span>{" "}
          <span className="text-foreground">{"{"}</span>
        </div>
        <div className="pl-4">
          <span className="syntax-function">constructor</span>
          <span className="text-foreground">()</span>{" "}
          <span className="text-foreground">{"{"}</span>
        </div>
        <div className="pl-8">
          <span className="syntax-variable">this</span>
          <span className="text-foreground">.name = </span>
          <span className="syntax-string">"Tanmay Wagh"</span>
          <span className="text-foreground">;</span>
        </div>
        <div className="pl-8">
          <span className="syntax-variable">this</span>
          <span className="text-foreground">.role = </span>
          <span className="syntax-string">"Full Stack Developer"</span>
          <span className="text-foreground">;</span>
        </div>
        <div className="pl-8">
          <span className="syntax-variable">this</span>
          <span className="text-foreground">.skills = [</span>
          <span className="syntax-string">"React"</span>
          <span className="text-foreground">, </span>
          <span className="syntax-string">"Node.js"</span>
          <span className="text-foreground">, </span>
          <span className="syntax-string">"MongoDB"</span>
          <span className="text-foreground">];</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground">{"}"}</span>
        </div>
        <div className="mt-2 pl-4">
          <span className="syntax-function">buildAwesomeApps</span>
          <span className="text-foreground">()</span>{" "}
          <span className="text-foreground">{"{"}</span>
        </div>
        <div className="pl-8">
          <span className="syntax-keyword">return</span>{" "}
          <span className="syntax-string">"Clean, scalable solutions"</span>
          <span className="text-foreground">;</span>
        </div>
        <div className="pl-4">
          <span className="text-foreground">{"}"}</span>
        </div>
        <div>
          <span className="text-foreground">{"}"}</span>
        </div>
        <div className="mt-3 pt-2 border-t border-border/50">
          <span className="syntax-keyword">const</span>{" "}
          <span className="syntax-variable">me</span>{" "}
          <span className="text-foreground">= </span>
          <span className="syntax-keyword">new</span>{" "}
          <span className="syntax-function">Developer</span>
          <span className="text-foreground">();</span>
        </div>
        <div>
          <span className="syntax-variable">me</span>
          <span className="text-foreground">.</span>
          <span className="syntax-function">buildAwesomeApps</span>
          <span className="text-foreground">();</span>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
