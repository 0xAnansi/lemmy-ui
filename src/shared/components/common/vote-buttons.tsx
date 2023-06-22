import { showScores } from "@utils/app";
import { numToSI } from "@utils/helpers";
import { Component, linkEvent } from "inferno";
import { CommentAggregates, PostAggregates } from "lemmy-js-client";
import { I18NextService } from "../../services";
import { Icon, Spinner } from "../common/icon";
import { PostListing } from "../post/post-listing";

interface VoteButtonsProps {
  postListing: PostListing;
  enableDownvotes?: boolean;
  upvoteLoading?: boolean;
  downvoteLoading?: boolean;
  handleUpvote: (i: PostListing) => void;
  handleDownvote: (i: PostListing) => void;
  counts: CommentAggregates | PostAggregates;
  my_vote?: number;
}

interface VoteButtonsState {
  upvoteLoading: boolean;
  downvoteLoading: boolean;
}

export class VoteButtonsCompact extends Component<
  VoteButtonsProps,
  VoteButtonsState
> {
  state: VoteButtonsState = {
    upvoteLoading: false,
    downvoteLoading: false,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  get pointsTippy(): string {
    const points = I18NextService.i18n.t("number_of_points", {
      count: Number(this.props.counts.score),
      formattedCount: Number(this.props.counts.score),
    });

    const upvotes = I18NextService.i18n.t("number_of_upvotes", {
      count: Number(this.props.counts.upvotes),
      formattedCount: Number(this.props.counts.upvotes),
    });

    const downvotes = I18NextService.i18n.t("number_of_downvotes", {
      count: Number(this.props.counts.downvotes),
      formattedCount: Number(this.props.counts.downvotes),
    });

    return `${points} • ${upvotes} • ${downvotes}`;
  }

  get tippy() {
    return showScores() ? { "data-tippy-content": this.pointsTippy } : {};
  }

  render() {
    return (
      <>
        <div className="input-group input-group-sm w-auto">
          <button
            className={`btn btn-sm btn-animate btn-outline-primary rounded-start py-0 ${
              this.props.my_vote === 1 ? "text-info" : "text-muted"
            }`}
            {...this.tippy}
            onClick={linkEvent(this.props.postListing, this.props.handleUpvote)}
            aria-label={I18NextService.i18n.t("upvote")}
            aria-pressed={this.props.my_vote === 1}
          >
            {this.state.upvoteLoading ? (
              <Spinner />
            ) : (
              <>
                <Icon icon="arrow-up1" classes="icon-inline small" />
                {showScores() && (
                  <span className="ms-2">
                    {numToSI(this.props.counts.upvotes)}
                  </span>
                )}
              </>
            )}
          </button>
          <span className="input-group-text small py-0">
            {numToSI(this.props.counts.score)}
          </span>
          {this.props.enableDownvotes && (
            <button
              className={`btn btn-sm btn-animate btn-outline-primary rounded-end py-0 ${
                this.props.my_vote === -1 ? "text-danger" : "text-muted"
              }`}
              onClick={linkEvent(
                this.props.postListing,
                this.props.handleDownvote
              )}
              {...this.tippy}
              aria-label={I18NextService.i18n.t("downvote")}
              aria-pressed={this.props.my_vote === -1}
            >
              {this.state.downvoteLoading ? (
                <Spinner />
              ) : (
                <>
                  <Icon icon="arrow-down1" classes="icon-inline small" />
                  {showScores() && (
                    <span className="ms-2">
                      {numToSI(this.props.counts.downvotes)}
                    </span>
                  )}
                </>
              )}
            </button>
          )}
        </div>
      </>
    );
  }
}

export class VoteButtons extends Component<VotesProps, VotesState> {
  state: VotesState = {
    upvoteLoading: false,
    downvoteLoading: false,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  get pointsTippy(): string {
    const points = I18NextService.i18n.t("number_of_points", {
      count: Number(this.props.counts.score),
      formattedCount: Number(this.props.counts.score),
    });

    const upvotes = I18NextService.i18n.t("number_of_upvotes", {
      count: Number(this.props.counts.upvotes),
      formattedCount: Number(this.props.counts.upvotes),
    });

    const downvotes = I18NextService.i18n.t("number_of_downvotes", {
      count: Number(this.props.counts.downvotes),
      formattedCount: Number(this.props.counts.downvotes),
    });

    return `${points} • ${upvotes} • ${downvotes}`;
  }

  get tippy() {
    return showScores() ? { "data-tippy-content": this.pointsTippy } : {};
  }

  render() {
    return (
      <div className={`vote-bar col-1 pe-0 small text-center`}>
        <button
          className={`btn-animate btn btn-link p-0 ${
            this.props.my_vote == 1 ? "text-info" : "text-muted"
          }`}
          onClick={linkEvent(this.props.postListing, this.props.handleUpvote)}
          data-tippy-content={I18NextService.i18n.t("upvote")}
          aria-label={I18NextService.i18n.t("upvote")}
          aria-pressed={this.props.my_vote === 1}
        >
          {this.state.upvoteLoading ? (
            <Spinner />
          ) : (
            <Icon icon="arrow-up1" classes="upvote" />
          )}
        </button>
        {showScores() ? (
          <div
            className={`unselectable pointer text-muted px-1 post-score`}
            data-tippy-content={this.pointsTippy}
          >
            {numToSI(this.props.counts.score)}
          </div>
        ) : (
          <div className="p-1"></div>
        )}
        {this.props.enableDownvotes && (
          <button
            className={`btn-animate btn btn-link p-0 ${
              this.props.my_vote == -1 ? "text-danger" : "text-muted"
            }`}
            onClick={linkEvent(
              this.props.postListing,
              this.props.handleDownvote
            )}
            data-tippy-content={I18NextService.i18n.t("downvote")}
            aria-label={I18NextService.i18n.t("downvote")}
            aria-pressed={this.props.my_vote === -1}
          >
            {this.state.downvoteLoading ? (
              <Spinner />
            ) : (
              <Icon icon="arrow-down1" classes="downvote" />
            )}
          </button>
        )}
      </div>
    );
  }
}
