import ToolTip from "@/components/global/Tooltip";
import Section from "@/components/settings/section";
import { Copy } from "lucide-react";
import React from "react";

type Props = { id: string };

const CodeSnippet = ({ id }: Props) => {
  let snippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles('
        .chat-frame {
            position: fixed;
            bottom: 50px;
            right: 50px;
            border: none;
        }
    ')
    
    iframe.src = "http://localhost:3000/chatbot"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)
    
    window.addEventListener("message", (e) => {
        if(e.origin !== "http://localhost:3000") return null
        let dimensions = JSON.parse(e.data)
        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
    })
        `;
  return (
    <div className="mt-10 flex-col gap-5 items-start">
      <Section
        label="Code snippet"
        msg="Copy the code snippet and paste into the header tag of your website"
      />
      <div className="glassMorPhism px-10 rounded-lg inline-block relative mt-2">
          <Copy
            className="absolute top-5 right-5 text-gray-400 cursor-pointer"
            onClick={() => navigator.clipboard.writeText(snippet)}
          />
        <pre>
          <code className="text-gray-50 ">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
