"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQuery = void 0;
// Sample responses for different types of queries
const queryResponses = {
    skills: [
        "I am proficient in React, Node.js, TypeScript, and MongoDB.",
        "I have experience with frontend frameworks like React and Vue.js.",
        "My backend skills include Node.js, Express, and database technologies like MongoDB and PostgreSQL."
    ],
    experience: [
        "I have 5+ years of experience in full-stack development.",
        "I've worked with companies like Tech Solutions Inc. and Digital Innovations.",
        "I started my career as a frontend developer before expanding to full-stack development."
    ],
    education: [
        "I have a Bachelor's degree in Computer Science.",
        "I've completed various certifications in web development and cloud technologies.",
        "I regularly participate in online courses to stay updated with the latest technologies."
    ],
    projects: [
        "I've built e-commerce platforms, task management applications, and portfolio websites.",
        "One of my notable projects is an e-commerce platform with full payment processing capabilities.",
        "I enjoy building applications that solve real-world problems."
    ],
    contact: [
        "You can reach me at your.email@example.com.",
        "Feel free to connect with me on LinkedIn or GitHub.",
        "I'm currently based in San Francisco, CA."
    ]
};
// Default responses for general queries
const defaultResponses = [
    "I'm a full-stack developer with a passion for creating beautiful and functional web applications.",
    "My portfolio showcases my skills in web development and design.",
    "I specialize in JavaScript/TypeScript ecosystems, with expertise in React, Node.js, and various database technologies."
];
const handleQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.body;
        if (!query || typeof query !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Query is required and must be a string'
            });
            return;
        }
        const lowerQuery = query.toLowerCase();
        // Find relevant responses based on keywords in the query
        let relevantResponses = [];
        // Check for keywords in the query
        Object.entries(queryResponses).forEach(([keyword, responses]) => {
            if (lowerQuery.includes(keyword)) {
                relevantResponses = [...relevantResponses, ...responses];
            }
        });
        // If no specific responses found, use default responses
        if (relevantResponses.length === 0) {
            relevantResponses = defaultResponses;
        }
        // Format the response
        const results = relevantResponses.map(text => ({ text }));
        // Simulate a short delay to make the response feel more natural
        setTimeout(() => {
            res.status(200).json({
                success: true,
                query,
                results
            });
        }, 500);
    }
    catch (error) {
        console.error('Error handling query:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing query'
        });
    }
});
exports.handleQuery = handleQuery;
