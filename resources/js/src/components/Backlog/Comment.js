import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { addComment, delComment } from "../../actions/issue";

const Comment = ({ comments = [], issueId, addComment, delComment }) => {
    const [focused, setFocused] = useState(false);
    const [body, setBody] = useState("");

    const handleOnComment = (e) => {
        e.preventDefault();
        addComment(body, issueId, onComment);
    };

    const onComment = () => {
        setBody("");
        setFocused(false);
    };

    return (
        <div>
            <form onSubmit={handleOnComment}>
                <textarea
                    name="comment"
                    id="comment"
                    value={body}
                    className="form-control form-control-lg"
                    placeholder="Add a comment"
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setBody(e.target.value)}
                    rows={focused ? 2 : 1}
                ></textarea>
                {focused && (
                    <div className="row p-2">
                        <button type="submit" className="btn btn-primary mx-2">
                            Save
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => setFocused(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
            <div className="py-3">
                {comments.map((item) => (
                    <div className="d-flex py-2" key={item.id}>
                        <img
                            src={item.author.avatarUrls["16x16"]}
                            alt={item.author.displayName}
                            width={40}
                            height={40}
                        />
                        <div className="mx-2">
                            <h6>
                                <strong>{item.author.displayName}</strong>
                                {"  "}
                                <span>
                                    {moment(item.created).fromNow()}
                                </span>{" "}
                            </h6>
                            <p className="text-left m-0">{item.body}</p>
                            <div className="row">
                                {/*<button
                                                    type="button"
                                                    className="btn mx-2"
                                                >
                                                    Save
                                                </button> */}

                                <button
                                    className="btn text-muted py-0"
                                    type="button"
                                    onClick={() => delComment(issueId, item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default connect(null, { addComment, delComment })(Comment);
